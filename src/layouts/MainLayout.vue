<template>
  <div class="app-main-layout">
    <nav class="navbar purple">
      <div class="nav-wrapper">
        <div class="navbar-left">
          <a href="#">
            <i class="material-icons">dehaze</i>
          </a>
          <span>12.12.12</span>
        </div>

        <ul class="right hide-on-small-and-down">
          <li>
            <a
              class="dropdown-trigger"
              href="#"
              data-target="dropdown"
            >
              USER NAME
              <i class="material-icons right">arrow_drop_down</i>
            </a>

            <ul id='dropdown' class='dropdown-content'>
              <li>
                <a href="#" class="black-text">
                  <i class="material-icons">account_circle</i>Profile
                </a>
              </li>
              <li class="divider" tabindex="-1"></li>
              <li>
                <a href="#" class="black-text">
                  <i class="material-icons">assignment_return</i>Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>

    <ul class="sidenav app-sidenav open">
      <li>
        <a href="#" class="waves-effect waves-purple pointer">Account</a>
      </li>
      <li>
        <a href="#" class="waves-effect waves-purple pointer">History</a>
      </li>
      <li>
        <a href="#" class="waves-effect waves-purple pointer">Planning</a>
      </li>
      <li>
        <a href="#" class="waves-effect waves-purple pointer">New Note</a>
      </li>
      <li>
        <a href="#" class="waves-effect waves-purple pointer">Categories</a>
      </li>
    </ul>

    <main class="app-content">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div class="fixed-action-btn">
      <a class="btn-floating btn-large blue" href="#">
        <i class="large material-icons">add</i>
      </a>
    </div>
  </div>
</template>
