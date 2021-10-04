<!-- Note: Flags just includes deprecations for now. It's possible that there may be future flags which are not deprecations. in this case the table should be able to be extended -->
|Key|Type|Description|
|---|----|-----------|{{ $deprecations := .Site.Data.deprecations }}{{ range $id, $dep := $deprecations }}{{ if eq $dep.flag true }}
| {{ $dep.name }} | Boolean | {{ replace $dep.comment "\n" " " }} The old functionality is deprecated [[{{ $id }}](/docs/deprecations#{{ $id }})], so enabling this feature is recommended. |{{ end }}{{ end }}