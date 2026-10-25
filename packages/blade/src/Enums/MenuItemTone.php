<?php

namespace BDynamic\Plinth\Enums;

/** A menu item's tone: neutral (the default) or danger, for an item that destroys or removes. */
enum MenuItemTone: string
{
    use ResolvesToDefault;

    case Neutral = 'neutral';
    case Danger = 'danger';

    public static function default(): self
    {
        return self::Neutral;
    }
}
