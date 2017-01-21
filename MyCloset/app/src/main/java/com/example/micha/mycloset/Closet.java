package com.example.micha.mycloset;

/**
 * Created by joshuapena on 1/21/17.
 */

import java.util.Map;
import java.util.HashMap;

public class Closet {
    public Map<String, Clothes> clothes = new HashMap<>();

    public Closet() {
    }

    public Closet(Map<String, Clothes> clothes) {
        this.clothes = clothes;
    }

    @Override
    public String toString() {
        return new StringBuilder()
                .append("{Closet:")
                .append(" clothes=").append(clothes.toString())
                .append(" length=").append(!clothes.isEmpty())
                .append("}").toString();
    }
}
