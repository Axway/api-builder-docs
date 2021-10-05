---
title: Node.js support policy
linkTitle: Node.js support policy
weight: 130
date: 2021-10-01
---

|     |     |
| --- | --- |
| Recommended | {{% variables/recommended_node %}} or greater |
| Minimum | {{% variables/minimum_node %}} |

## Node.js releases

New semver-major releases of Node.js are released every six months. In coordination with a new _odd-numbered_ major release being cut, the previous _even-numbered_ major version will transition to the Long Term Support plan. An odd-numbered major release will cease to be actively updated when the subsequent even-numbered major release is cut. Production applications should only use _Active LTS_ or _Maintenance LTS_ releases.

See [https://nodejs.org/en/about/releases](https://nodejs.org/en/about/releases/) or [https://github.com/nodejs/Release#release-plan](https://github.com/nodejs/Release#release-plan) for more information.

## Node.js support

{{% variables/apibuilder_prod_name %}} v4 was initially released with compatibility with Node.js {{% variables/minimum_node %}}. This compatibility will be maintained in every {{% variables/apibuilder_prod_name %}} v4.x release to avoid breaking existing services.

When Node.js releases are no longer supported, they become vulnerable to current or future security issues since they will not get updated. Beginning with the Jackson release, {{% variables/apibuilder_prod_name %}} no longer recommends the use of any Node.js version which is unmaintained or end of life. Updated services will emit a warning if they are using an unsupported version of Node.js.

Additionally, {{% variables/apibuilder_prod_name %}} will strive to introduce compatibility in a timely manner for new releases of Node.js.

While compatibility is guaranteed, {{% variables/apibuilder_prod_name %}} may deprecate the use of any version of Node.js at any point in order to offer a seamless transition to a future major version.

## Node.js security releases

As with any software, from time to time there will be important security releases for Node.js. These versions will often have fixes for web related vulnerabilities which are very important to when running an {{% variables/apibuilder_prod_name %}} service. We strongly recommend to keep an eye on the [Node.js blog](https://nodejs.org/en/blog/vulnerability/) for new security releases and stay up-to-date to keep your service secure. {{% variables/apibuilder_prod_name %}} will update the recommended Node.js version as and when new security releases become available.
