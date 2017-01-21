package com.example.micha.mycloset;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import android.util.Log;

import android.support.v7.app.ActionBar.LayoutParams;
import android.widget.Button;
import android.view.View;
import android.content.Intent;
import android.graphics.Bitmap;
import android.provider.MediaStore;
import android.widget.EditText;
import android.widget.ImageView;
import android.os.Environment;
import android.net.Uri;
import android.support.v4.content.FileProvider;
import android.widget.LinearLayout;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.ArrayList;
import java.util.Date;
import java.text.SimpleDateFormat;

import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;

public class MainActivity extends AppCompatActivity {

    private DatabaseReference mDatabase;
    private Button mScanButton;
    private Button mTodayButton;
    private ImageView mImageView;
    private LinearLayout mLinearLayout;

    static final int REQUEST_IMAGE_CAPTURE = 1;
    private List<EditText> allEds = new ArrayList<EditText>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mLinearLayout = (LinearLayout) findViewById(R.id.linear_edit_text);
        mImageView = (ImageView) findViewById(R.id.image_view);
        mScanButton = (Button) findViewById(R.id.button_scan);
        mTodayButton = (Button) findViewById(R.id.button_today);


        mTodayButton.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                // Perform action on click
                for (int i = 0; i < allEds.size(); i++) {
                    Log.d("INTERN", allEds.get(i).getText().toString());
                }
            }
        });

        mScanButton.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                // Perform action on click
                dispatchTakePictureIntent();
            }
        });

        mDatabase = FirebaseDatabase.getInstance().getReference();

        ValueEventListener postListener = new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                // Get Post object and use the values to update the UI
                // For Cloest
                List<Clothes> post = new ArrayList<Clothes>();
                for (DataSnapshot data : dataSnapshot.getChildren()) {
                    post.add(data.getValue(Clothes.class));
                }

                EditText ed;

                for (int i = 0; i < post.size(); i++) {
                    Log.d("INTERN", post.get(i).toString());
                    ed = new EditText(MainActivity.this);
                    allEds.add(ed);
                    ed.setId(i);
                    ed.setLayoutParams(new LayoutParams(LayoutParams.MATCH_PARENT,
                            LayoutParams.WRAP_CONTENT));
                    ed.setText(post.get(i).color);
                    mLinearLayout.addView(ed);
                }

                // For Outfit
//                Outfit post = new Outfit();
//                for (DataSnapshot data : dataSnapshot.getChildren()) {
//                    switch (data.getKey()) {
//                        case "hat":
//                            post.hat = data.getValue(Clothes.class);
//                            break;
//                        case "shirt":
//                            post.shirt = data.getValue(Clothes.class);
//                            break;
//                        case "pants":
//                            post.pants = data.getValue(Clothes.class);
//                            break;
//                        case "shoes":
//                            post.shoes = data.getValue(Clothes.class);
//                            break;
//                        default:
//                            break;
//                    }
//                }
//                Log.d("INTERN", "works");
//                Log.d("INTERN", dataSnapshot.toString());
//                Log.d("INTERN", post.toString());
                // ...
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                // Getting Post failed, log a message
                Log.w("INTERN", "loadPost:onCancelled", databaseError.toException());
                // ...
            }
        };

        mDatabase.child("today").addListenerForSingleValueEvent(postListener);
    }

    String mCurrentPhotoPath;

    private File createImageFile() throws IOException {
        // Create an image file name
        String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        String imageFileName = "JPEG_" + timeStamp + "_";
        File storageDir = getExternalFilesDir(Environment.DIRECTORY_PICTURES);
        File image = File.createTempFile(
                imageFileName,  /* prefix */
                ".jpg",         /* suffix */
                storageDir      /* directory */
        );

        // Save a file: path for use with ACTION_VIEW intents
        mCurrentPhotoPath = image.getAbsolutePath();
        return image;
    }

    private void dispatchTakePictureIntent() {
        Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        // Ensure that there's a camera activity to handle the intent
        if (takePictureIntent.resolveActivity(getPackageManager()) != null) {
            // Create the File where the photo should go
            File photoFile = null;
            try {
                photoFile = createImageFile();
            } catch (IOException ex) {
                // Error occurred while creating the File
            }
            // Continue only if the File was successfully created
            if (photoFile != null) {
                Uri photoURI = FileProvider.getUriForFile(this,
                        "com.example.android.fileprovider",
                        photoFile);
                takePictureIntent.putExtra(MediaStore.EXTRA_OUTPUT, photoURI);
                startActivityForResult(takePictureIntent, REQUEST_IMAGE_CAPTURE);
            }
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == REQUEST_IMAGE_CAPTURE && resultCode == RESULT_OK) {
            Bundle extras = data.getExtras();
            Bitmap imageBitmap = (Bitmap) extras.get("data");
            mImageView.setImageBitmap(imageBitmap);
        }
    }
}
