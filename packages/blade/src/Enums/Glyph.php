<?php

namespace BDynamic\Plinth\Enums;

/**
 * The icon's built-in glyphs: the interface glyphs every product needs, drawn on a 24 × 24 grid
 * with a 2-unit round stroke. Not a general icon library; brand and domain icons stay in the app.
 */
enum Glyph: string
{
    case Menu = 'menu';
    case Close = 'close';
    case Back = 'back';
    case ChevronLeft = 'chevron-left';
    case ChevronRight = 'chevron-right';
    case ChevronUp = 'chevron-up';
    case ChevronDown = 'chevron-down';
    case Check = 'check';
    case Plus = 'plus';
    case Search = 'search';
    case More = 'more';
    case External = 'external';
    case SignOut = 'sign-out';
    case Sun = 'sun';
    case Moon = 'moon';
    case System = 'system';
    case Info = 'info';
    case Warning = 'warning';

    /** A case, its value, or nothing when it is not one, so the slot shows instead. */
    public static function resolve(self|string|null $value): ?self
    {
        if ($value instanceof self) {
            return $value;
        }

        return self::tryFrom((string) $value);
    }

    /** @return list<string> */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    /** Whether the glyph points a direction, so it flips in right-to-left text. */
    public function mirrors(): bool
    {
        return in_array($this, [self::Back, self::ChevronLeft, self::ChevronRight, self::SignOut], true);
    }

    /** The glyph's SVG, as Vue's and React's iconGlyph() print it. */
    public function svg(): string
    {
        $paths = match ($this) {
            self::Menu => '<path d="M4 7h16M4 12h16M4 17h16"></path>',
            self::Close => '<path d="M6 6l12 12M18 6L6 18"></path>',
            self::Back => '<path d="M19 12H5M11 6l-6 6 6 6"></path>',
            self::ChevronLeft => '<path d="M15 6l-6 6 6 6"></path>',
            self::ChevronRight => '<path d="M9 6l6 6-6 6"></path>',
            self::ChevronUp => '<path d="M6 15l6-6 6 6"></path>',
            self::ChevronDown => '<path d="M6 9l6 6 6-6"></path>',
            self::Check => '<path d="M5 12l5 5L19 7"></path>',
            self::Plus => '<path d="M12 5v14M5 12h14"></path>',
            self::Search => '<circle cx="11" cy="11" r="6.5"></circle><path d="M16 16l4 4"></path>',
            self::More => '<circle cx="5" cy="12" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle>',
            self::External => '<path d="M14 4h6v6M20 4l-9 9"></path><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"></path>',
            self::SignOut => '<path d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4"></path><path d="M15 8l4 4-4 4M19 12H9"></path>',
            self::Sun => '<circle cx="12" cy="12" r="4"></circle><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"></path>',
            self::Moon => '<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"></path>',
            self::System => '<rect x="3" y="4" width="18" height="12" rx="2"></rect><path d="M8 20h8M12 16v4"></path>',
            self::Info => '<circle cx="12" cy="12" r="9"></circle><path d="M12 11v5M12 7.5v.01"></path>',
            self::Warning => '<path d="M10.3 4.3L2.6 18a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0z"></path><path d="M12 9.5v4M12 17v.01"></path>',
        };

        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'.$paths.'</svg>';
    }
}
