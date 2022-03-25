{{ range .Page.Pages }}
* [{{ .Title }}]({{ .Permalink }}){{ range .Pages }}{{ end }}{{ end }}