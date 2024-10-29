package petadoption.api.RecommendationEngine;

public class AttributeFrequency {
    private String attribute;
    private int likes;

    public String getAttribute() {
        return attribute;
    }

    public void setAttribute(String attribute) {
        this.attribute = attribute;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }
}
