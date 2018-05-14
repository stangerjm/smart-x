Examples:

HTML Markup: 
    *note that "dropItems" is a JSON array
```html
<bit-drop-list 
    :drop-items="dropItems">
</bit-drop-list>
```

And the JSON:

```json
{
  "dropItems": [
    {
      "itemTitle": "Home", 
      "linkPath": "/"
    },
    {
          "itemTitle": "Region", 
          "linkPath": "/Region"
    },
    {
          "itemTitle": "About", 
          "linkPath": "/About"
    }
  ]
}
```