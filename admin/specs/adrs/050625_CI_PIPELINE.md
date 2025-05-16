# Continuous Integration Pipline

## Unit tests:

We will use *Jest* for our testing framework since it is the tool taught in class, which gives us some 
familiarity with the tool and it is likely to be one of the most simple and widely used since Prof. Powell
is a very practical man.

## Documentation:

We will use **JSDoc** since it's the most commonly used one and the format is shared accross many languages
so people will be used to it.

## Linting:

#### HTML:
We will use **HTMLHint** since it is a popular html linter and has good documentation and easy setup.

#### CSS:
We will use **stylelint** since it seems to be the best of limited options. Since the CSS does not have
much variance in it's writing style, the configuration should not be difficult.

#### JavaScript:
- We will use **EsLint** since it is the most popular one and has good documentation online. It is also
easy to set up and work both locally, and as a github action.
- This requires us to install extra EsLint dependencies. Currently we have **naming-convention** and **parser**
which should be very stable and frequently used, so there sould be no issues.

## Github pages deployment:

We are unsure how to set this up for now, but it would be amazing if on every push, we would get a
demonstration of the result of our changes on the web. Meruj has seen this setup in the JFlap repo
so we know this is possible, but it may be blocked behind payment.