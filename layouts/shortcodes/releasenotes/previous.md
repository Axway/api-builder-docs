{{ $s := newScratch }}
## Previous releases

| Year | Releases |
|------|----------{{ $len := len .Page.Parent.RegularPages }}{{ range $index, $page := .Page.Parent.RegularPages }}{{ if ne ($s.Get "year") (.Date.Format "2006") }}{{ $s.Set "year" (.Date.Format "2006") }}|
| {{ $s.Get "year" }} |{{else}}, {{end}}[{{ .LinkTitle }}]({{ .RelPermalink }}) ({{ .Date.Format "2 Jan" }}){{ end }}