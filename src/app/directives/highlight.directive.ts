import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';
import { isUndefined } from 'src/lib/util';
const matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnChanges {
  @Input() search: string;
  @Input() text: string;
  @Input() useInnerHTML = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  public ngOnChanges(): void {
    if (isUndefined(this.search)) {
      if (this.text.length > 0) {
        this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.text);
      }
      return;
    }

    if (this.text.length > 0) {
      const search = this.escapeStringRegexp(this.search.toString());
      if (this.useInnerHTML) {
        this.removePrevHighlights();
      }

      this.renderer.setProperty(this.el.nativeElement, 'innerHTML',
        this.replace(search.length > 0 && this.useInnerHTML ? this.el.nativeElement.innerHTML : this.text, search));
    }
  }

  private removePrevHighlights(): void {
    const searchRgx = new RegExp('</?span[^>]*>', 'gi');
    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.el.nativeElement.innerHTML.replace(searchRgx, ''));
  }

  private replace(txt: string, search: string): string {
    const searchRgx = new RegExp('(' + search + ')', 'gi');
    return txt.replace(searchRgx, `<span class="highlight">$1</span>`);
  }

  private escapeStringRegexp(str: string): string {
    if (typeof str !== 'string') {
      throw new TypeError('Expected a string');
    }

    if (str.includes('<')) {
      str = str.replace(new RegExp('<', 'gi'), '&lt;');
    }

    if (str.includes('>')) {
      str = str.replace(new RegExp('>', 'gi'), '&gt;');
    }

    return str.replace(matchOperatorsRe, '\\$&');
  }
}
