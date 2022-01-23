import { createGlobalStyle } from "styled-components";
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
  }
  .card{
    background: ${({ theme }) => theme.body};
  }
  .pcoded-main-container{
    background: ${({ theme }) => theme.background};
  }
  .pcoded .pcoded-header[header-theme="theme1"]{
    background: ${({ theme }) => theme.nav};
  }
  .pcoded .pcoded-container{
    background: ${({ theme }) => theme.background};
  }
  .pcoded .pcoded-navbar[navbar-theme="themelight1"] .main-menu{
    background: ${({ theme }) => theme.body};
  }
  .pcoded .pcoded-navbar[active-item-theme="theme1"] .pcoded-item > li.active > a{
    background: ${({ theme }) => theme.sideNav};
  }
  .modal-content{
    background: ${({ theme }) => theme.body};
  }
  .btn-grd-primary.hor-grd{
       background: ${({ theme }) => theme.sideNav};
    }
    .table th, .table td{
        border-top:1px solid ${({ theme }) => theme.border};
    }
    .table > thead > tr > th {
        border-bottom-color: ${({ theme }) => theme.border};
    }
    .pcoded .pcoded-navbar .pcoded-item::after {
    background:${({ theme }) => theme.border};
    }
    .bg-dark{
      background: ${({ theme }) => theme.nav}!important;
    }
    .lightdark a{
        color:#eee!important;
    }
    .form-material .form-default.form-static-label .form-control{
      background: ${({ theme }) => theme.body};
      color:${({ theme }) => theme.text};
    }

  `;
