{{ $deprecations := .Site.Data.deprecations }}
{{ $this := . }}
{{ range $id, $dep := $deprecations }}
### [{{ $id }}] {{ $dep.name }} {#{{ $id }}}
Beginning with the [{{ $dep.release }}](/docs/release_notes/{{ lower $dep.release }}) release, {{ $dep.summary }}
<!-- TODO: make dependencies anchors -->
{{ with $dep.dependencies }}This depends on {{ delimit $dep.dependencies ", " "and " }}.{{ end }}
{{ range where $this.Page.RegularPages "Params.deprecation" $id }}
{{ if eq $dep.flag true }}
This will be the default behavior in all new services. For more information on how to be prepared for the change, and to start using the new behavior now, refer to [{{ .Title }}]({{ .RelPermalink }}).
{{ else }}
For more information on how to be prepared for the change, refer to [{{ .Title }}]({{ .RelPermalink }}).
{{ end }}
{{ end }}
{{ end }}