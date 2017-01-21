package com.example.micha.mycloset;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import android.util.Log;

import java.util.List;
import java.util.ArrayList;

import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;

public class MainActivity extends AppCompatActivity {

    private DatabaseReference mDatabase;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mDatabase = FirebaseDatabase.getInstance().getReference();

        ValueEventListener postListener = new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                // Get Post object and use the values to update the UI
                List<Clothes> post = new ArrayList<Clothes>();
                for (DataSnapshot data : dataSnapshot.getChildren()) {
                    post.add(data.getValue(Clothes.class));
                }
                Log.d("INTERN", "works");
                Log.d("INTERN", dataSnapshot.toString());
                Log.d("INTERN", post.toString());
                // ...
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                // Getting Post failed, log a message
                Log.w("INTERN", "loadPost:onCancelled", databaseError.toException());
                // ...
            }
        };

        mDatabase.child("closet").addListenerForSingleValueEvent(postListener);
    }
}
