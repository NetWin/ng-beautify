## 0.0.2 - 2024-03-23

- Fixed an issue where `}@else {` wasn't converted to `} @else {` correctly
- Fixed an issue where newlines in Angular expressions were removed
  ```html
  <div>
    {{
      'Hello, world!'
    }}
  </div>
  ```
  was incorrectly being formatted as
  ```html
  <div>
    {{ 'Hello, world!' }}
  </div>
  ```
  even though i want to allow newlines in Angular expressions. For example:
  ```html
  <div>
    {{
      'my-very-long-translation-string-with-some-more-text' | translate: {
        param1: 'value1',
        param2: 'value2'
      }
    }}
  </div>
  ```

## 0.0.1 - 2024-03-22

- Initial release
