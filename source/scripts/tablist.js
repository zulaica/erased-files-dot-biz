const tablist = document.querySelector('.tablist');
const tablistControls = tablist.querySelectorAll('.tablist-control input');
const panels = tablist.querySelectorAll('div[class$="-panel"]');

const getPanel = (tablistControlElement) =>
  [...panels].find((panel) =>
    [...panel.classList].includes(`${tablistControlElement.id}-panel`)
  );

const deactivatePanel = (tablistControlElement) => {
  const panel = getPanel(tablistControlElement);

  tablistControlElement.removeAttribute('checked');
  tablistControlElement.setAttribute('aria-expanded', false);

  panel.setAttribute('aria-hidden', true);
};

const activatePanel = (tablistControlElement) => {
  const panel = getPanel(tablistControlElement);

  tablistControlElement.setAttribute('checked', true);
  tablistControlElement.setAttribute('aria-expanded', true);

  panel.removeAttribute('aria-hidden');
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
