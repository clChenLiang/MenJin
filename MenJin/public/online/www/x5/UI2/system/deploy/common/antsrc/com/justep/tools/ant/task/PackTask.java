package com.justep.tools.ant.task;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import org.apache.http.client.methods.HttpPost;

public class PackTask extends HttpTask {

	private String userID;
	private String appName;
	private String platform;
	private String sourceMode;
	private String appBuilderServer;
	private String realAppBuilderServer;
	private String session;
	private String justepHome;
	private String workDir;

	protected String getURL() {
		return realAppBuilderServer + "/app/pack";
	}

	protected String getParams() throws UnsupportedEncodingException {
		String justepHome = realAppBuilderServer.equals(appBuilderServer) ? "" : this.justepHome;
		String workDir = realAppBuilderServer.equals(appBuilderServer) ? "" : this.workDir;
		return "userID=" + userID + "&appName=" + URLEncoder.encode(appName, "UTF-8") + "&platform=" + platform + "&sourceMode=" + sourceMode + "&session=" + session + "&justepHome="
				+ URLEncoder.encode(justepHome, "UTF-8") + "&workDir=" + URLEncoder.encode(workDir, "UTF-8");
	}

	protected void preparePost(HttpPost httppost) {
	}

	public void setAppName(String appName) {
		this.appName = appName;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	public void setPlatform(String platform) {
		this.platform = platform;
	}

	public void setSourceMode(String sourceMode) {
		this.sourceMode = sourceMode;
	}

	public void setAppBuilderServer(String appBuilderServer) {
		this.appBuilderServer = appBuilderServer;
	}

	public void setRealAppBuilderServer(String realAppBuilderServer) {
		this.realAppBuilderServer = realAppBuilderServer;
	}

	public void setSession(String session) {
		this.session = session;
	}

	public void setJustepHome(String justepHome) {
		this.justepHome = justepHome;
	}

	public void setWorkDir(String workDir) {
		this.workDir = workDir;
	}

}