<?php

namespace BDynamic\Plinth\Enums;

/**
 * Who wrote a timeline post, as the ring on its avatar: the team (the default), a customer, or an
 * internal note, whose body sits in a warning-tinted box under a badge.
 */
enum TimelineKind: string
{
    use ResolvesToDefault;

    case Team = 'team';
    case Customer = 'customer';
    case Note = 'note';

    public static function default(): self
    {
        return self::Team;
    }
}
