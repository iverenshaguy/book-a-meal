import { expect } from 'chai';
import notificationsDB from '../../../src/data/notifications.json';
import Notifications from '../../../src/controllers/Notifications';

// const notifications = new Notifications(notificationsDB, 'notification');

// testing just the controller because notification is
// automatically added when new menu is added
describe('Notifications Controller: Add a Notifcation', () => {
  const notif = {
    userId: 'a09a5570-a3b2-4e21-94c3-5cf483dbd1ac',
    menuId: '15421f7a-0f82-4802-b215-e0e8efb6bfb3',
    message: 'Rice and Stew with Beef was just added to the menu',
  };

  it('should add a notification to the notifications db', () => {
    Notifications.create(notif);

    expect(notificationsDB[notificationsDB.length - 1]).to.include.keys('userId');
    expect(notificationsDB[notificationsDB.length - 1]).to.include.keys('menuId');
    expect(notificationsDB[notificationsDB.length - 1]).to.include.keys('created');
    expect(notificationsDB[notificationsDB.length - 1]).to.include.keys('updated');
    expect(notificationsDB[notificationsDB.length - 1]).to.include.keys('notifId');
    expect(notificationsDB[notificationsDB.length - 1].message)
      .to.equal('Rice and Stew with Beef was just added to the menu');
  });
});
