<?php

namespace BDynamic\Plinth\Support;

final class Field
{
    /** The id of a field's label, for a control's aria-labelledby (field.css). */
    public static function labelId(string $id): string
    {
        return $id.'-label';
    }

    /**
     * What a field's control lists in aria-describedby: its description's id, then its error's,
     * or null when it has neither. The Vue and React layers' fieldDescribedBy() do the same.
     */
    public static function describedBy(string $id, ?string $description = null, ?string $error = null): ?string
    {
        $ids = array_filter([
            filled($description) ? $id.'-description' : null,
            filled($error) ? $id.'-error' : null,
        ]);

        return $ids === [] ? null : implode(' ', $ids);
    }
}
