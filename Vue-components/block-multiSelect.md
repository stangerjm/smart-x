Examples:

```vue
<block-multi-select
    :options-data="[
        {id: 1, name: 'USA', locations: ['Washington', 'Oregon', 'California']},
        {id: 2, name: 'Japan', locations: ['Kyoto', 'Osaka', 'Uwajima']}]"
    parent-title="Country"
    child-title="Location"
    display-key="name">
</block-multi-select>
```

HTML: <br>
*Note the colon before options-data property, which indicates that "optionsData" is a JSON array (see JSON example below), not a string literal
```html
<block-multi-select
    :options-data="optionsData"
    parent-title="Country"
    child-title="Location"
    display-key="name">
</block-multi-select>
```

And the JSON: 

```json
{
  "optionsData": 
    [
      {
        "id": 1,
        "name": "USA", 
        "locations": ["Washington", "Oregon", "California"]
      },
      {
        "id": 2,
        "name": "Japan", 
        "locations": ["Kyoto", "Osaka", "Uwajima"]
      }
    ]
}
```

**&ast;Note that the JSON data MUST keep this structure in order to render properly, but the information and KEYS are flexible
and can be changed to any valid JSON value.**
<br>
I.E. The following is still a valid example:

```json
{
  "optionsData": 
    [
      {
        "code": 12,
        "region": "United States", 
        "areas": ["New York", "Texas", "Idaho"]
      },
      {
        "code": 10,
        "region": "Japan", 
        "areas": ["Tokyo", "Shikoku", "Kobe"]
      }
    ]
}
```