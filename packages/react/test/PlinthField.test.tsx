import { render } from '@testing-library/react';
import { createRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { fieldControl, PlinthField } from '../src/index.ts';

describe('PlinthField', () => {
  it('prints the label, the control, the description and the error around one control', () => {
    expect(
      renderToStaticMarkup(
        <PlinthField
          id="team"
          label="Team"
          required
          description="Who answers first."
          error="Pick a team."
        >
          <select id="team" />
        </PlinthField>,
      ),
    ).toBe(
      '<div class="plinth-field">' +
        '<label class="plinth-field-label" id="team-label" for="team">Team<span class="plinth-field-required" aria-hidden="true">*</span></label>' +
        '<select id="team"></select>' +
        '<p class="plinth-field-description" id="team-description">Who answers first.</p>' +
        '<p class="plinth-field-error" id="team-error">Pick a team.</p>' +
        '</div>',
    );
  });

  it('is a fieldset with a legend for a group, described by its description and error', () => {
    expect(
      renderToStaticMarkup(
        <PlinthField id="status" label="Status" group description="D" error="E" />,
      ),
    ).toBe(
      '<fieldset class="plinth-field" id="status" aria-describedby="status-description status-error">' +
        '<legend class="plinth-field-label" id="status-label">Status</legend>' +
        '<p class="plinth-field-description" id="status-description">D</p>' +
        '<p class="plinth-field-error" id="status-error">E</p>' +
        '</fieldset>',
    );
  });

  it('leaves out blank messages and the hidden label by default, and hides it when asked', () => {
    expect(
      renderToStaticMarkup(<PlinthField id="s" label="S" group description=" " error="" />),
    ).toBe(
      '<fieldset class="plinth-field" id="s"><legend class="plinth-field-label" id="s-label">S</legend></fieldset>',
    );
    expect(renderToStaticMarkup(<PlinthField id="a" label="A" hideLabel />)).toContain(
      '<div class="plinth-field" data-label="hidden">',
    );
  });

  it('gives a children function the ids the control points at', () => {
    const { container } = render(
      <PlinthField id="team" label="Team" description="D" error="E">
        {(control) => (
          <select
            id={control.id}
            aria-labelledby={control.labelId}
            aria-describedby={control.describedBy}
            aria-invalid={control.invalid ? 'true' : undefined}
          />
        )}
      </PlinthField>,
    );
    const select = container.querySelector('select')!;

    expect(select.id).toBe('team');
    expect(select.getAttribute('aria-labelledby')).toBe('team-label');
    expect(select.getAttribute('aria-describedby')).toBe('team-description team-error');
    expect(select.getAttribute('aria-invalid')).toBe('true');
  });

  it('generates an id when it has none', () => {
    const { container } = render(<PlinthField label="A" id=" " />);
    const label = container.querySelector('label')!;

    expect(label.htmlFor).toMatch(/^plinth-field-/);
    expect(label.id).toBe(`${label.htmlFor}-label`);
  });

  it('needs a label', () => {
    expect(() => renderToStaticMarkup(<PlinthField label=" " />)).toThrow('needs a label');
  });

  it('escapes the label and the messages', () => {
    const html = renderToStaticMarkup(
      <PlinthField label="A <b>" description="B & C" error="Not <this>" />,
    );

    expect(html).toContain('A &lt;b&gt;');
    expect(html).toContain('B &amp; C');
    expect(html).toContain('Not &lt;this&gt;');
  });

  it('forwards extra props and the ref to the root, where the project wins a clash', () => {
    const ref = createRef<HTMLElement>();
    const { container } = render(
      <PlinthField
        ref={ref}
        id="s"
        label="S"
        group
        description="D"
        className="mb-4"
        data-testid="s"
        aria-describedby="mine"
        disabled
      />,
    );
    const root = container.firstElementChild as HTMLFieldSetElement;

    expect(root.className).toBe('plinth-field mb-4');
    expect(root.dataset.testid).toBe('s');
    expect(root.getAttribute('aria-describedby')).toBe('mine');
    expect(root.disabled).toBe(true);
    expect(ref.current).toBe(root);
  });
});

describe('fieldControl', () => {
  it('leaves a group control without aria-describedby: its fieldset has it', () => {
    expect(fieldControl('s', true, 'D', 'E')).toEqual({
      id: undefined,
      labelId: 's-label',
      describedBy: undefined,
      invalid: true,
    });
  });
});
