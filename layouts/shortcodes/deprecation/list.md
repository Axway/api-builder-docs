{{ $deprecations := .Site.Data.deprecations }}
{{ $majors := .Site.Data.majorReleases }}
{{ $this := . }}
{{ $eolDate := "FUBAR" }}
{{ range $id, $dep := $deprecations }}
### [{{ $id }}] {{ $dep.name }} {#{{ $id }}}
<!-- this will access .Site.Data.majorReleases[ $dep.eol ] -->
{{ $major := index $majors $dep.eol }}
|  |  |
| ---- | ---- |
| **Introduced in release** | [{{ $dep.release }}](/docs/release_notes/{{ lower $dep.release }}) ({{ $dep.date }}) |
| **Expected end of life** | {{ $major.date }} |
| **Status** | Active |

{{ $dep.summary }}
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
