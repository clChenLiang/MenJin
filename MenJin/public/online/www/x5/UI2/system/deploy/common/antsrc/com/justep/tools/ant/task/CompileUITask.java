package com.justep.tools.ant.task;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.apache.tools.ant.BuildException;
import org.apache.tools.ant.Task;

import com.justep.tools.ant.common.Utils;
import com.justep.ui.PackageWindowCompiler;

public class CompileUITask extends Task {

	private String justepHome;
	private String dirs;
	private String targetDir;
	private String indexURL;
	private String usedPlugins;
	private String UI2 = "UI2";

	private String arrayToString(String[] array) {
		StringBuilder result = new StringBuilder();
		for (String item : array) {
			if (result.length() > 0) {
				result.append(",");
			}
			result.append("/" + UI2 + "/" + item);
		}

		return result.toString();
	}

	private String listToString(Set<String> list) {
		StringBuilder result = new StringBuilder();
		Iterator<String> iterator = list.iterator();
		while (iterator.hasNext()) {
			if (result.length() > 0) {
				result.append(",");
			}
			result.append(iterator.next());
		}

		return result.toString();
	}

	private String getFixedTargetDir(String targetDir, String indexURL) {
		int index = indexURL.indexOf(UI2);
		if (index < 0) {
			throw new BuildException("indexURL“" + indexURL + "”中不包含“" + UI2 + "”，资源编译失败");
		}

		return targetDir + indexURL.substring(0, index - 1);
	}

	private String getFixedIndexURL(String indexURL) {
		int index = indexURL.indexOf(UI2);
		if (index < 0) {
			throw new BuildException("indexURL“" + indexURL + "”中不包含“" + UI2 + "”，资源编译失败");
		}

		return indexURL.substring(index - 1);
	}

	private void SetIntroPage(String mainWPath) throws IOException {
		String introHtmlFile = (new File(mainWPath)).getParent() + "/intro.html";
		if (new File(introHtmlFile).exists()) {
			InputStream tmplStream = getClass().getClassLoader().getResourceAsStream("com/justep/tools/ant/task/intro.html");
			BufferedReader br = new BufferedReader(new InputStreamReader(tmplStream, "UTF-8"));
			StringBuffer sb = new StringBuffer();
			String str = null;
			while ((str = br.readLine()) != null)
				sb.append(str + "\r\n");
			
			String srcStr = "<body style=\"width:100%;height:100%;margin: 0;\">";
			Utils.replaceFileText(mainWPath, srcStr, srcStr + "\r\n" + sb.toString());
		}
	}

	public void setJustepHome(String justepHome) {
		this.justepHome = justepHome;
	}

	public void setDirs(String dirs) {
		this.dirs = dirs;
	}

	public void setTargetDir(String targetDir) {
		this.targetDir = targetDir;
	}

	public void setIndexURL(String indexURL) {
		this.indexURL = indexURL;
	}

	public void setUsedPlugins(String usedPlugins) {
		this.usedPlugins = usedPlugins;
	}

	public void execute() throws BuildException {
		if (dirs == null || "".equals(dirs)) {
			return;
		}

		try {
			String[] param = new String[] { justepHome + "/runtime/UIServer", arrayToString(dirs.split(",")), getFixedTargetDir(targetDir, indexURL), "", "", getFixedIndexURL(indexURL) };
			List<String> fails = new ArrayList<String>();
			Set<String> plugins = new HashSet<String>();
			PackageWindowCompiler.compile(param, fails, plugins);
			SetIntroPage(targetDir + indexURL);
			getProject().setProperty(usedPlugins, listToString(plugins));
		} catch (Exception e) {
			throw new BuildException(e);
		}
	}

}