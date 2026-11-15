<?php

namespace BDynamic\Plinth\Enums;

/** How the breadcrumbs collapse on a phone: the full trail, or only the parent as a back link. */
enum BreadcrumbsCollapse: string
{
    use ResolvesToDefault;

    case None = 'none';
    case Parent = 'parent';

    public static function default(): self
    {
        return self::None;
    }
}
