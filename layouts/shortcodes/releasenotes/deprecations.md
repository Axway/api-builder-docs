<!-- Automatically generate a list of deprecations for a release. The parent page must specify a "release" in the frontmatter which matches the release in the deprecations list -->
{{ $deprecations := .Site.Data.deprecations }}
<!-- Can't filter an object with "where" so build a new list of deprecation $ids for the release -->
{{ $ids := slice }}
{{ range $id, $dep := $deprecations }}
{{ if eq $dep.release $.Page.Params.linkTitle }}
{{ $ids = $ids | append $id }}
{{ end }}
{{ end }}
<!-- Now use the new array to conditionally print the deprecations section -->
{{ if gt (len $ids) 0 }}
## Deprecations
These are the deprecations introduced in this release. Click [here](/docs/deprecations) for a list of all deprecations.
{{ end }}
{{ range $id := $ids }} {{ $dep := index $deprecations $id }}
* [[{{ $id }}](/docs/deprecations#{{ $id }})] **{{ $dep.name }}**: {{ humanize $dep.summary }} {{ end }}