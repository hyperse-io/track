## All contributions are welcome!

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info

Thank you for your interest in contributing to our documentation site! We appreciate your support and value the insights and expertise of our community. This page outlines the guidelines and process for contributing, as well as the rewards you can earn for your efforts.

:::

We welcome contributions in a variety of forms, including but not limited to:

1. Pointing out a mistake/typo and (optionally) providing a solution
2. Providing translation
3. Creating or improving diagrams, charts, or visual aids
4. Suggesting improvements to the documentation structure or organization
5. Writing or updating a tutorial or guide
6. Creating or updating code samples, examples, or demos
7. Polishing or improving document writing

To make a contribution, please take one of the following actions:

- **Report an Issue**: If you spot a problem or is willing to suggest improvements, [create an issue](https://github.com/hyperse-io/track/issues/new/choose) to let us know.
- **Submit Changes**: For direct contributions to content, [create a pull request](https://github.com/hyperse-io/track/compare).

## Create an Issue

You can create an issue for the following purposes:

- To report any mistakes or typos.
- To request new content or improvements to current content.

You can typically create an issue directly through the [GitHub web page](https://github.com/hyperse-io/track/issues/new/choose). Here, you'll find various templates to guide your issue submission.

If you're able to address the issue yourself, we encourage you to take the initiative. When creating an issue, you can indicate your willingness to resolve it. For bug reports, select the option “I'd be willing to fix this issue myself” in the BUG template. For feature requests, select “I'd be willing to contribute this feature myself” in the Feature Request template.

<Tabs>
<TabItem value="Bug" label="Bug report" className="bg-[#011627] p-[var(--ifm-pre-padding)] rounded overflow-hidden">

**Describe the bug**

A clear and concise description of what the bug is.

**To Reproduce**

Steps to reproduce the behavior:

1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**

A clear and concise description of what you expected to happen.

**Environment (please complete the following information):**

- @hyperse/track version:
- Nodejs version

**Additional context**

Add any other context about the problem here.
</TabItem>
<TabItem value="Feature" label="Feature request" className="bg-[#011627] p-[var(--ifm-pre-padding)] rounded overflow-hidden">

**Is your feature request related to a problem? Please describe.**

A clear and concise description of what the problem is. Ex. I'm always frustrated when [...]

**Describe the solution you'd like**

A clear and concise description of what you want to happen.

**Describe alternatives you've considered**

A clear and concise description of any alternative solutions or features you've considered.

**Additional context**

Add any other context or screenshots about the feature request here.

</TabItem>
</Tabs>

## Create a Pull Request

Contributing to projects through a pull request (PR) is a valuable way to improve existing documentation or code. This guide will walk you through the process step by step, ensuring clarity and ease of understanding, especially for those new to GitHub and git operations.

For complex operations, you can also check the [closed pull requests](https://github.com/hyperse-io/track/pulls?q=is%3Apr+is%3Aclosed) for grammar reference. For example,

- [Added Ecosystem Page + Video](https://github.com/hyperse-io/track/pull/392) shows how to add an article with video reference.
- [feat: template example](https://github.com/hyperse-io/track/pull/410) shows how to make use of mdx's feature to create similar pages using template.

:::note

This process does not apply to [TRANSLATIONS](#provide-translation).

:::

### Local Development for Substantial Changes

:::tip

Refer to [Github's tutorial](https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project) if you are not familiar with git or Github operations.

:::

For more significant contributions like adding a new page or extensive revisions:

1. Setting Up:

   - Ensure you have [node.js](https://nodejs.org/en) (version `>= 18`) and [yarn](https://yarnpkg.com/getting-started/install) installed.
   - Fork and clone the [hyperse-io/track](https://github.com/hyperse-io/track)repository. Detailed instructions for forking and cloning are available on GitHub's help pages.

2. Making Changes Locally:

- Run `yarn` in your terminal to preview the project.
- Complete the place you need to change and provide the corresponding UT.
- Run `yarn test` command to check whether the function is complete.
- Navigate to the `website/**` folder and complete documentation for new features.

3. Submitting Your Changes:

- After making changes, run `npx changeset add` to improve the changelog.
- Commit your changes with a meaningful message, then push to your forked repository. Initiate a pull request on GitHub by comparing your branch to the original repository.

### Working on an Existing Issue

To avoid overlapping efforts and streamline contributions, it is suggested to follow these steps:

1. Check for Accepted Issues:

- Look for issues labeled "ACCEPTED" or similarly indicating readiness for contributions. If unsure, ask in the issue comments.

2. Announce Your Intentions:

- Comment on the issue stating that you are working on it. This helps prevent duplicate efforts.

3. (Optional)Link Your Contributions:

- When committing your changes, reference the issue number in your commit message, e.g., `fix: typo. Ref #123456`.
