package com.example.micha.mycloset;

/**
 * Created by joshuapena on 1/21/17.
 */

public class Outfit {
    public String key;
    public Clothes hat;
    public Clothes shirt;
    public Clothes pants;
    public Clothes shoes;

    public Outfit() {
    }

    public Outfit(String key, Clothes hat, Clothes shirt, Clothes pants, Clothes shoes) {
        this.key = key;
        this.hat = hat;
        this.shirt = shirt;
        this.pants = pants;
        this.shoes = shoes;
    }

    @Override
    public String toString() {
        return new StringBuilder()
                .append("{Outfit:")
                .append(" key=").append(key)
                .append(", hat=").append(hat.toString())
                .append(", shirt:").append(shirt.toString())
                .append(", pants:").append(pants.toString())
                .append(", shoes:").append(shoes.toString())
                .append("}").toString();
    }
}
