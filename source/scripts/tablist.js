const tablist = document.querySelector('.tablist');
const tablistControls = tablist.querySelectorAll('.tablist-control input');
const panels = tablist.querySelectorAll('div[class$="-panel"]');

const getPanel = (node) =>
  [...panels].find((panel) =>
    [...panel.classList].includes(`${node.id}-panel`)
  );

const deactivatePanel = (sibling) => {
  const panel = getPanel(sibling);

  sibling.removeAttribute('checked');
  sibling.setAttribute('aria-expanded', false);

  panel.setAttribute('hidden', true);
};

const activatePanel = (target) => {
  const panel = getPanel(target);

  target.setAttribute('checked', true);
  target.setAttribute('aria-expanded', true);

  panel.removeAttribute('hidden');
};

export const tablistSetup = () =>
  tablistControls.forEach((tablistControl) => {
    tablistControl.addEventListener('change', (event) => {
      event.preventDefault();

      const { target } = event;
      const siblings = [...tablistControls].filter(
        (tablistControl) => tablistControl !== target
      );

      siblings.forEach((sibling) => {
        deactivatePanel(sibling);
      });

      activatePanel(target);
    });
  });
