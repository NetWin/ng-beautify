## 0.0.4 - 2024-03-24

- Remove leading and trailing spaces within parameters / conditions of control flow statements.
  Example:
  ```html
  @if (    condition    ) {
    <div>Content</div>
  }
  ```
  will be converted to
  ```html
  @if (condition) {
    <div>Content</div>
  }
  ```

## 0.0.3 - 2024-03-23

- Empty release, no new changes

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
