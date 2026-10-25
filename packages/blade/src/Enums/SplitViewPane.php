<?php

namespace BDynamic\Plinth\Enums;

/**
 * The one pane a split view shows on a phone: the list (the default) or the detail. From 768px
 * both show, whichever the app names.
 */
enum SplitViewPane: string
{
    use ResolvesToDefault;

    case List = 'list';
    case Detail = 'detail';

    public static function default(): self
    {
        return self::List;
    }
}
