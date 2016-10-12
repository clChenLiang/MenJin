package com.justep.tools.ant.task;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import org.apache.http.HttpEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.entity.mime.content.StringBody;

public class UploadTask extends HttpTask {

	private String userID;
	private String file;
	private String appBuilderServer;
	private String realAppBuilderServer;
	private String session;
	private String justepHome;
	private String workDir;

	protected String getURL() {
		return realAppBuilderServer + "/app/upload";
	}

	protected String getParams() throws UnsupportedEncodingException {
		String justepHome = realAppBuilderServer.equals(appBuilderServer) ? "" : this.justepHome;
		String workDir = realAppBuilderServer.equals(appBuilderServer) ? "" : this.workDir;
		return "userID=" + userID + "&session=" + session + "&justepHome=" + URLEncoder.encode(justepHome, "UTF-8") + "&workDir=" + URLEncoder.encode(workDir, "UTF-8");
	}

	protected void preparePost(HttpPost httppost) {
		FileBody bin = new FileBody(new File(file));
		StringBody comment = new StringBody("content of native app", ContentType.APPLICATION_OCTET_STREAM);
		HttpEntity reqEntity = MultipartEntityBuilder.create().addPart("bin", bin).addPart("comment", comment).build();
		httppost.setEntity(reqEntity);
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	public void setFile(String file) {
		this.file = file;
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