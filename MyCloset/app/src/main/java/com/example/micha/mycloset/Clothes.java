package com.example.micha.mycloset;

/**
 * Created by joshuapena on 1/21/17.
 */

import java.util.List;

public class Clothes {
    public String key;
    public String color;
    public String type;
    public List<String> when;

    public Clothes() {
    }

    public Clothes(String key, String color, String type, List<String> when) {
        this.key = key;
        this.color = color;
        this.type = type;
        this.when = when;
    }

    @Override
    public String toString() {
        return new StringBuilder()
                .append("{Clothes:")
                .append(" key=").append(key)
                .append(", color=").append(color)
                .append(", type:").append(type)
                .append(", when:").append(when.toString())
                .append("}").toString();
    }
}
