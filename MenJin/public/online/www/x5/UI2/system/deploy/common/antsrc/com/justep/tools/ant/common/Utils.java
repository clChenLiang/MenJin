package com.justep.tools.ant.common;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;

public class Utils {

	static public void replaceFileText(final String filePath, String srcStr, String replaceStr) throws FileNotFoundException, IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(filePath), "UTF-8"));
		StringBuffer sb = new StringBuffer();
		String str = null;
		while ((str = br.readLine()) != null)
			sb.append(str + "\r\n");
		FileOutputStream file = new FileOutputStream(filePath);
		file.write(sb.toString().replaceAll(srcStr, replaceStr).getBytes("UTF-8"));
		br.close();
		file.close();
	}

	public static Boolean isMacOSX() {
		return (System.getProperty("os.name").toLowerCase().indexOf("mac os x") != -1);
	}
	
}
