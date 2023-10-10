package com.koshishapp;

import static androidx.core.app.ActivityCompat.startActivityForResult;
import static com.henninghall.date_picker.DatePickerPackage.context;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import androidx.activity.result.ActivityResult;
import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.surepass.surepassesign.InitSDK;

public class EsignModule extends ReactContextBaseJavaModule implements ActivityEventListener {

    private String eventCount = "";

    private String responsek = "";
    ReactApplicationContext reactContext;
    ActivityResultLauncher<Intent> someActivityResultLauncher;
    public EsignModule(@Nullable ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext=reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return "EsignModule";
    }

    @ReactMethod
    public void createEsignEvent(Callback callback) {
        Log.d("Esign Module", "This is my Esign Module");

//        Toast.makeText(context, "This is my Esign Module", Toast.LENGTH_SHORT).show();
        callback.invoke("Data return from Native modeule");
    }

    @ReactMethod
    public void createEsignPromise(Promise promise) {
        try {
            Log.e("promise", "sonam");


//            Toast.makeText(context, "This is my Esign 1:", Toast.LENGTH_SHORT).show();

            promise.resolve("Data return from promise");
//            token = token;
//            Intent intent = new Intent(context, InitSDK.class);
//            intent.putExtra("token", token);
//            intent.putExtra("env", "PROD"); // are you using sandbox or prod. ?ithing prod now try..
//            startActivityForResult(context.getCurrentActivity(),intent, 10001,new Bundle());

//            sendEvent(getReactApplicationContext(), "EventCount", eventCount);
        } catch (Exception e) {

            promise.reject("Error return from promise", e);
        }
    }

    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           String params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    @ReactMethod
    public void addListener(String eventName) {
        Log.e("EventListner", "ok:" + eventName);
//        Toast.makeText(context, " " + eventName, Toast.LENGTH_SHORT).show();

    }

    @ReactMethod
    public void removeListeners(Integer count) {

    }

    //
    @ReactMethod
    public void GetToken(String Token) {
//        Toast.makeText(context, "" + Token, Toast.LENGTH_SHORT).show();


        reactContext.addActivityEventListener(this);
        Intent intent = new Intent(context, InitSDK.class);
        intent.putExtra("token", Token);
        intent.putExtra("env", "PROD"); // are you using sandbox or prod. ?ithing prod now try..
        onNewIntent(intent);
    }


    @Override
    public void onActivityResult(Activity activity, int i, int i1, @Nullable Intent intent) {
//        Toast.makeText(context, "ok" + i + "," + i1, Toast.LENGTH_SHORT).show();


        if (i == 10001) {

            String result = intent.getStringExtra("signedResponse");
            sendEvent(getReactApplicationContext(), "EventCount", result);
//            Toast.makeText(activity, result, Toast.LENGTH_SHORT).show();


        } else {
            sendEvent(getReactApplicationContext(), "EventCount", "EventCount4");
//            Toast.makeText(context, "kuch to gadbad he dya4", Toast.LENGTH_SHORT).show();

        }

    }

    @Override
    public void onNewIntent(Intent intent) {
//        sendEvent(context, "EventCount", "Start");
//someActivityResultLauncher.launch(intent);
        startActivityForResult(getReactApplicationContext().getCurrentActivity(), intent, 10001, new Bundle());
    }


}
