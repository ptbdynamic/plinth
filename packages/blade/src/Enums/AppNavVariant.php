<?php

namespace BDynamic\Plinth\Enums;

/**
 * The app nav's form from 1280px: the sidebar (the default, which prints no attribute), or the
 * rail it is from 768px, kept at every wider width.
 */
enum AppNavVariant: string
{
    use ResolvesToDefault;

    case Sidebar = 'sidebar';
    case Rail = 'rail';

    public static function default(): self
    {
        return self::Sidebar;
    }
}
