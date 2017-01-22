package com.example.micha.mycloset;

/**
 * Created by joshuapena on 1/21/17.
 */

import java.util.List;
import android.net.Uri;

import com.google.firebase.database.IgnoreExtraProperties;

@IgnoreExtraProperties
public class Clothes {
    public String key;
    public String color;
    public String type;
    public List<String> when;
    public String url;

    public Clothes() {
    }

    public Clothes(String key, String color, String type, List<String> when, Uri downloadUrl) {
        this.key = key;
        this.color = color;
        this.type = type;
        this.when = when;
        this.url = downloadUrl.toString();
    }

    @Override
    public String toString() {
        return new StringBuilder()
                .append("{Clothes:")
                .append(" key=").append(key)
                .append(", color=").append(color)
                .append(", type:").append(type)
                .append(", when:").append(when.toString())
                .append(", url:").append(url.toString())
                .append("}").toString();
    }
}
