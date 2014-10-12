package com.example.app_ionic;

import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Toast;

import org.apache.cordova.*;


public class MainActivity extends DroidGap
{
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        super.setIntegerProperty("splashscreen", R.drawable.splash);
        super.setStringProperty("loadingDialog", "Wait,Loading Demo...");
        super.loadUrl("file:///android_asset/www/index.html", 7000);
        // Set by <content src="index.html" /> in config.xml
       // super.loadUrl(Config.getStartUrl());
       // super.loadUrl("file:///android_asset/www/index.html");
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
    	  // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }
    @Override
    public boolean onOptionsItemSelected(MenuItem item)
    {
         
        switch (item.getItemId())
        {
        case R.id.action_settings:
            // Single menu item is selected do something
            // Ex: launching new activity/screen or show alert message
            Toast.makeText(MainActivity.this, "Bookmark is Selected", Toast.LENGTH_SHORT).show();
            return true;
 
 
        default:
            return super.onOptionsItemSelected(item);
        }
    } 
    
}
