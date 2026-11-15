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
    case Home = 'home';
    case Dashboard = 'dashboard';
    case Settings = 'settings';
    case Bell = 'bell';
    case Help = 'help';
    case Refresh = 'refresh';
    case Play = 'play';
    case Pause = 'pause';

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
            self::Home => '<path d="M4 10l8-6 8 6v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"></path><path d="M10 20v-6h4v6"></path>',
            self::Dashboard => '<rect x="3" y="3" width="7" height="9" rx="1"></rect><rect x="14" y="3" width="7" height="5" rx="1"></rect><rect x="14" y="12" width="7" height="9" rx="1"></rect><rect x="3" y="16" width="7" height="5" rx="1"></rect>',
            self::Settings => '<path d="M10.2 5.2L10.7 2.6A9.5 9.5 0 0 1 13.3 2.6L13.8 5.2A7 7 0 0 1 15.5 5.9L17.7 4.4A9.5 9.5 0 0 1 19.6 6.3L18.1 8.5A7 7 0 0 1 18.8 10.2L21.4 10.7A9.5 9.5 0 0 1 21.4 13.3L18.8 13.8A7 7 0 0 1 18.1 15.5L19.6 17.7A9.5 9.5 0 0 1 17.7 19.6L15.5 18.1A7 7 0 0 1 13.8 18.8L13.3 21.4A9.5 9.5 0 0 1 10.7 21.4L10.2 18.8A7 7 0 0 1 8.5 18.1L6.3 19.6A9.5 9.5 0 0 1 4.4 17.7L5.9 15.5A7 7 0 0 1 5.2 13.8L2.6 13.3A9.5 9.5 0 0 1 2.6 10.7L5.2 10.2A7 7 0 0 1 5.9 8.5L4.4 6.3A9.5 9.5 0 0 1 6.3 4.4L8.5 5.9A7 7 0 0 1 10.2 5.2z"></path><circle cx="12" cy="12" r="3"></circle>',
            self::Bell => '<path d="M6 10a6 6 0 0 1 12 0c0 5 2 7 2 7H4s2-2 2-7"></path><path d="M10 20a2 2 0 0 0 4 0"></path>',
            self::Help => '<circle cx="12" cy="12" r="9"></circle><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7M12 17v.01"></path>',
            self::Refresh => '<path d="M20 12a8 8 0 1 1-2.3-5.7L20 8"></path><path d="M20 4v4h-4"></path>',
            self::Play => '<path d="M7 4l12 8-12 8z"></path>',
            self::Pause => '<rect x="6" y="5" width="4" height="14" rx="1"></rect><rect x="14" y="5" width="4" height="14" rx="1"></rect>',
        };

        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'.$paths.'</svg>';
    }
}
