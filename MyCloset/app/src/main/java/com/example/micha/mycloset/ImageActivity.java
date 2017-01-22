package com.example.micha.mycloset;

import android.media.Image;
import android.net.Uri;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import android.util.Log;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;

import com.firebase.ui.storage.images.FirebaseImageLoader;

import com.bumptech.glide.Glide;

import java.util.ArrayList;
import java.util.List;

public class ImageActivity extends AppCompatActivity {

    private DatabaseReference mDatabase;
    private StorageReference storageReference;

    private ImageView mHatImageView;
    private ImageView mShirtImageView;
    private ImageView mPantsImageView;
    private ImageView mShoesImageView;
    private Outfit post;

    private StorageReference hatStoreageReference;
    private StorageReference shirtStoreageReference;
    private StorageReference pantsStoreageReference;
    private StorageReference shoesStoreageReference;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_images);

        mHatImageView = (ImageView) findViewById(R.id.hat_image_view);
        mShirtImageView = (ImageView) findViewById(R.id.shirt_image_view);
        mPantsImageView = (ImageView) findViewById(R.id.pants_image_view);
        mShoesImageView = (ImageView) findViewById(R.id.shoes_image_view);

        mDatabase = FirebaseDatabase.getInstance().getReference();
        storageReference = FirebaseStorage.getInstance().getReference();

        ValueEventListener postListener = new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                // For Outfit
                post = new Outfit();
                for (DataSnapshot data : dataSnapshot.getChildren()) {
                    switch (data.getKey()) {
                        case "hat":
                            post.hat = data.getValue(Clothes.class);
                            hatStoreageReference = FirebaseStorage.getInstance().getReferenceFromUrl(post.hat.url.toString());

                            Glide.with(ImageActivity.this)
                                    .using(new FirebaseImageLoader())
                                    .load(hatStoreageReference)
                                    .into(mHatImageView);
                            break;
                        case "shirt":
                            post.shirt = data.getValue(Clothes.class);
                            shirtStoreageReference = FirebaseStorage.getInstance().getReferenceFromUrl(post.shirt.url.toString());

                            Glide.with(ImageActivity.this /* context */)
                                    .using(new FirebaseImageLoader())
                                    .load(shirtStoreageReference)
                                    .into(mShirtImageView);
                            break;
                        case "pants":
                            post.pants = data.getValue(Clothes.class);
                            pantsStoreageReference = FirebaseStorage.getInstance().getReferenceFromUrl(post.pants.url.toString());

                            Glide.with(ImageActivity.this /* context */)
                                    .using(new FirebaseImageLoader())
                                    .load(pantsStoreageReference)
                                    .into(mPantsImageView);
                            break;
                        case "shoes":
                            post.shoes = data.getValue(Clothes.class);
                            shoesStoreageReference = FirebaseStorage.getInstance().getReferenceFromUrl(post.shoes.url.toString());

                            Glide.with(ImageActivity.this /* context */)
                                    .using(new FirebaseImageLoader())
                                    .load(shoesStoreageReference)
                                    .into(mShoesImageView);
                            break;
                        default:
                            break;
                    }
                }
                Log.d("INTERN", "works");
                Log.d("INTERN", dataSnapshot.toString());
                Log.d("INTERN", post.toString());
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
}

//
//    Intent intent = new Intent(mContext, LoginAccount.class);
//    startActivity(intent);
