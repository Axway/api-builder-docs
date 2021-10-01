```javascript
// ./conf/default.js

module.exports = {
	// Flags to enable features that are not ready for production or
	// whose use may require manual upgrade steps in legacy services.
	flags: { {{ $deprecations := .Site.Data.deprecations }}{{ range $id, $dep := $deprecations }}{{ if eq $dep.flag true }}
		{{ replace (replaceRE `(?m:^)` "// " $dep.comment) "\n" "\n\t\t" }}
		{{ $dep.name }}: false,{{ end }}{{ end }}
	}
}
```