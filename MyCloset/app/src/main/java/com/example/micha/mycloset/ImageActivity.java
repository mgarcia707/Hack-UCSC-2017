package com.example.micha.mycloset;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import android.util.Log;
import android.widget.EditText;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;

import java.util.ArrayList;
import java.util.List;

public class ImageActivity extends AppCompatActivity {

    private DatabaseReference mDatabase;
    private StorageReference storageReference;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_images);

        mDatabase = FirebaseDatabase.getInstance().getReference();
        storageReference = FirebaseStorage.getInstance().getReference();

        ValueEventListener postListener = new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                // For Outfit
                Outfit post = new Outfit();
                for (DataSnapshot data : dataSnapshot.getChildren()) {
                    switch (data.getKey()) {
                        case "hat":
                            post.hat = data.getValue(Clothes.class);
                            break;
                        case "shirt":
                            post.shirt = data.getValue(Clothes.class);
                            break;
                        case "pants":
                            post.pants = data.getValue(Clothes.class);
                            break;
                        case "shoes":
                            post.shoes = data.getValue(Clothes.class);
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
