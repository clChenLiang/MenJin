package com.justep.tools.ant.task;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

import org.apache.tools.ant.BuildException;
import org.apache.tools.ant.Task;
import org.apache.tools.ant.taskdefs.Execute;
import org.apache.tools.ant.taskdefs.Redirector;
import org.apache.tools.ant.types.Commandline;
import org.apache.tools.ant.types.Environment;
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.SAXReader;
import org.dom4j.io.XMLWriter;

import com.justep.tools.ant.common.Utils;

public class UpdateProjectTask extends Task {

	private Redirector redirector = new Redirector(this);

	private String justepHome;
	private String targetDir;
	private String packageName;
	private String appName;
	private String startURL;
	private String version;
	private Boolean extBrowser;

	private Environment env = new Environment();

	private void exec(String cmd, String opration) throws IOException, BuildException {
		Commandline cmdl = new Commandline();
		cmdl.setExecutable(cmd);
		String[] arg = { opration };
		cmdl.addArguments(arg);

		Execute exe = new Execute(redirector.createHandler(), null);
		exe.setCommandline(cmdl.getCommandline());
		exe.setAntRun(getProject());
		exe.setWorkingDirectory(new File(targetDir));
		exe.setVMLauncher(true);
		String[] environment = this.env.getVariables();
		if (environment != null) {
			for (int i = 0; i < environment.length; i++) {
				log("Setting environment variable: " + environment[i], 3);
			}
		}
		exe.setEnvironment(environment);

		int returnCode = exe.execute();
		if (exe.killedProcess()) {
			String msg = "Timeout: killed the sub-process";
			throw new BuildException(msg);
		}
		this.redirector.complete();
		if (Execute.isFailure(returnCode)) {
			throw new BuildException(getTaskType() + " returned: " + returnCode, getLocation());
		}
	}

	public void setJustepHome(String justepHome) {
		this.justepHome = justepHome;
	}

	public void setTargetDir(String targetDir) {
		this.targetDir = targetDir;
	}

	public void setPackageName(String packageName) {
		this.packageName = packageName;
	}

	public void setAppName(String appName) {
		this.appName = appName;
	}

	public void setStartURL(String startURL) {
		this.startURL = startURL;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public void setExtBrowser(Boolean extBrowser) {
		this.extBrowser = extBrowser;
	}

	public void addEnv(Environment.Variable var) {
		this.env.addVariable(var);
	}

	public void execute() throws BuildException {
		try {
			Utils.replaceFileText(this.targetDir + "/platforms/android/src/com/justep/x5/base/Constants.java", "PACKNAME = \"[\\w.]*\"", "PACKNAME = \"" + packageName + "\"");
			Utils.replaceFileText(this.targetDir + "/platforms/android/src/com/justep/x5/base/Constants.java", "APPNAME = \"[\\w.]*\"", "APPNAME = \"" + appName + "\"");
			SAXReader xReader = new SAXReader();
			String configXMLPath = this.targetDir + "/config.xml";
			InputStreamReader isr = new InputStreamReader(new FileInputStream(configXMLPath), "UTF-8");
			Document config = xReader.read(isr);
			Element e = (Element) config.selectSingleNode("//widget");
			// 设置默认打开的页面
			e.element("content").attribute("src").setValue(startURL);
			// 设置应用名
			e.element("name").setText(appName);
			// 设置版本号
			e.attribute("version").setValue(version);
			// 设置名空间，唯一标识app
			String oldPackageName = e.attribute("id").getValue();
			e.attribute("id").setValue(packageName);

			OutputStreamWriter osw = new OutputStreamWriter(new FileOutputStream(configXMLPath), "UTF-8");
			XMLWriter writer = new XMLWriter(osw, OutputFormat.createPrettyPrint());
			writer.write(config);
			writer.close();

			// 使用标准浏览器或者crosswalk内核
			Utils.replaceFileText(this.targetDir + "/platforms/android/project.properties", "=CordovaLib[\\w-]*", extBrowser ? "=CordovaLib-crosswalk" : "=CordovaLib");

			File cordova = new File(this.justepHome + "/tools/cordova/bin/cordova" + (Utils.isMacOSX() ? "" : ".cmd"));
			exec(cordova.getAbsolutePath(), "prepare");

			// 删除老的入口Activity文件X5.java
			if (!packageName.equals(oldPackageName)) {
				File oldX5Java = new File(this.targetDir + "/platforms/android/src/" + oldPackageName.replace(".", "/") + "/X5.java");
				if (oldX5Java.exists()) {
					oldX5Java.delete();
				}
			}
		} catch (Exception e) {
			throw new BuildException(e);
		}
	}

}