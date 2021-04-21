import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrainerSidebarService {
  toggled = false;
  _hasBackgroundImage = true;
  menus = [
    {
      title: 'general',
      type: 'header'
    },
    {
      title: 'Workouts',
      icon: 'fa fa-heartbeat',
      active: false,
      type: 'dropdown',
      // badge: {
      //   text: 'New ',
      //   class: 'badge-warning'
      // },
      submenus: [
        {
          title: 'Body Improvement',

          // badge: {
          //   text: 'Pro ',
          //   class: 'badge-success'
          // }
        },
        {
          title: 'BI Report'
        },
        {
          title: 'View Schedule'
        },
        {
          title: 'Create Schedule'
        }
      ]
    },
    // {
    //   title: 'Registration',
    //   icon: 'fa fa-book',
    //   active: false,
    //   type: 'dropdown',
    //   // badge: {
    //   //   text: '3',
    //   //   class: 'badge-danger'
    //   // },
    //   submenus: [
    //     {
    //       title: 'Trainer Registration',
    //     },
    //     {
    //       title: 'Member Registration'
    //     }
    //   ]
    // },

    // {
    //   title: 'Profit Reports',
    //   icon: 'fa fa-briefcase',
    //   active: false,
    //   type: 'dropdown',
    //   submenus: [
    //     {
    //       title: 'Daily Report',
    //     },
    //     {
    //       title: 'Monthly Report'
    //     },
    //     {
    //       title: 'Annual Report'
    //     },
    //     {
    //       title: 'Selected Period'
    //     }
    //   ]
    // },

    {
      title: 'User',
      icon: 'fa fa-user-circle',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Change Password',
        },
        {
          title: 'Update Profile'
        }
      ]
    },
    {
      title: 'Guidelines',
      icon: 'fa fa-map',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Add Guidelines',
        }
      ]
    }
    // {
    //   title: 'Course',
    //   icon: 'fa fa-folder-open',
    //   active: false,
    //   type: 'dropdown',
    //   submenus: [
    //     {
    //       title: 'Add Course',
    //     },
    //     {
    //       title: 'Update Course'
    //     }
    //   ]
    // },

    // {
    //   title: 'Specification',
    //   icon: 'fa fa-eye',
    //   active: false,
    //   type: 'dropdown',
    //   submenus: [
    //     {
    //       title: 'Add Specification',
    //     },
    //     {
    //       title: 'Update Specification'
    //     }
    //   ]
    // },

    // {
    //   title: 'More',
    //   type: 'header'
    // },
    // {
    //   title: 'Attendance',
    //   icon: 'fa fa-calendar',
    //   active: false,
    //   type: 'simple',
    //   // badge: {
    //   //   text: 'Beta',
    //   //   class: 'badge-primary'
    //   // },
    // },
    // {
    //   title: 'Payment',
    //   icon: 'fa fa-university',
    //   active: false,
    //   type: 'simple'
    // }
    
  ];
  constructor() { }

  toggle() {
    this.toggled = !this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  getMenuList() {
    return this.menus;
  }

  get hasBackgroundImage() {
    return this._hasBackgroundImage;
  }

  set hasBackgroundImage(hasBackgroundImage) {
    this._hasBackgroundImage = hasBackgroundImage;
  }
}
