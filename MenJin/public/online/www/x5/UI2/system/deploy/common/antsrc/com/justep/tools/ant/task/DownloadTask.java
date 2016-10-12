package com.justep.tools.ant.task;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;

public class DownloadTask extends HttpTask {

	private String userID;
	private String appBuilderServer;
	private String realAppBuilderServer;
	private String dir;
	private String fileName;
	private String justepHome;
	private String workDir;

	protected String getURL() {
		return realAppBuilderServer + "/app/download";
	}

	protected String getParams() throws UnsupportedEncodingException {
		String justepHome = realAppBuilderServer.equals(appBuilderServer) ? "" : this.justepHome;
		String workDir = realAppBuilderServer.equals(appBuilderServer) ? "" : this.workDir;
		return "userID=" + userID + "&justepHome=" + URLEncoder.encode(justepHome, "UTF-8") + "&workDir=" + URLEncoder.encode(workDir, "UTF-8");
	}

	protected void preparePost(HttpPost httppost) {
	}

	protected void processResponse(CloseableHttpResponse response) throws IOException {
		HttpEntity entity = response.getEntity();
		if (entity != null) {
			InputStream is = entity.getContent();
			OutputStream os = new FileOutputStream(dir + "/" + ((fileName == null) || "".equals(fileName) ? "x5.zip" : fileName));
			try {
				int bytesRead = 0;
				byte[] buffer = new byte[8192];
				while ((bytesRead = is.read(buffer, 0, 8192)) != -1) {
					os.write(buffer, 0, bytesRead);
				}
			} finally {
				os.close();
				is.close();
			}
		}
		this.getProject().executeTarget("unZipAppBuilderServerPackage");
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	public void setAppBuilderServer(String appBuilderServer) {
		this.appBuilderServer = appBuilderServer;
	}

	public void setRealAppBuilderServer(String realAppBuilderServer) {
		this.realAppBuilderServer = realAppBuilderServer;
	}

	public void setDir(String dir) {
		this.dir = dir;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public void setJustepHome(String justepHome) {
		this.justepHome = justepHome;
	}

	public void setWorkDir(String workDir) {
		this.workDir = workDir;
	}

}