# Contribution Guidelines

Hi! Thank you for taking the time to contribute to Hyperse!

In order to make the best use of both your time and that of the Hyperse maintainers, please follow the guidelines in this document.

## Branches

There are 3 important branches to know about:

- `master` - the default branch
- `minor` - a branch for commits which introduce new features which would go in the next [SemVer minor](https://semver.org/) release.
- `major` - a branch for commits which introduce breaking changes which would go in the next [SemVer major](https://semver.org/) release.

Bug fixes should go direct in the `master` branch, from which new patch releases will be made regularly. Periodically the master branch will be merged into the `minor` and `major` branches.

## Bug fixes

If you would like to contribute a bugfix, please first create an issue detailing the bug, and indicate that you intend to fix it. When creating commits, please follow the commit message format below.

## New features

Again, please create a feature request detailing the functionality you intend to add, and state that you would like to implement it. When creating commits, please follow the commit message format below. New feature pull requests should be made against the `minor` branch.

When adding new public APIs to support your new feature, add a `@since 1.2.0` tag (where "1.2.0" corresponds to what will be the next minor version) to the doc block. This will let readers of the documentation know the version in which the API was introduced. See the [docs readme](./README.md) for more details on the valid docs tags.

```TypeScript
/**
 * @description
 * Sets the value of the new API thing.
 *
 * @since 1.2.0
 */
myNewApi: number;
```

## Commit message format

This repo uses [Conventional Commits](https://www.conventionalcommits.org).

```
type(scope): Message in present tense
```

`type` may be one of:

- **feat** (A new feature)
- **fix** (A bug fix)
- **docs** (Documentation only changes)
- **style** (Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc))
- **refactor** (A code change that neither fixes a bug nor adds a feature)
- **perf** (A code change that improves performance)
- **test** (Adding missing tests or correcting existing tests)
- **chore** (Other changes that don't modify src or test file)

`scope` indicates the package affected by the commit:

- website
- core
- common
- etc.

If a commit affects more than one package, separate them with a comma:

```shell
fix(core,common): Fix the thing
```

```shell
You can use `yarn g:cz` to interactively prompt you on how to commit.
```

If a commit applies to no particular package (e.g. a tooling change in the root package.json), the scope can be omitted.

#### Breaking Changes

If your contribution includes any breaking changes (including any backwards-incompatible changes; backwards-incompatible changes to current behavior), please include a `BREAKING CHANGE` section in your commit message as per the [Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/#commit-message-with-both-and-breaking-change-footer).

Please also make your pull request against the `major` branch rather than `master` in the case of breaking changes.

Example:

```shell
feat(core): Add new field to Customer

Relates to #123. This commit adds the "foo" field to the Custom entity.

BREAKING CHANGE: A DB migration will be required in order to add the new "foo" field to the customer table.
```

#### Linting

Commit messages are linted on commit, so you'll know if your message is not quite right.

## Setting up the dev environment

After cloning the Hyperse repo, please follow the [Development guide](./README.md#development) in the README for instructions on how to get up and running locally.

## Contributor License Agreement

All contributors are required to agree to the [Contributor License Agreement](https://github.com/hyperse-io/.github/blob/main/license/CLA.md) before their contributions can be merged.

This is done via an automation bot which will prompt you to sign the CLA when you open a pull request.
