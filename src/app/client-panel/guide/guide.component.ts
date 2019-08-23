import {Component, OnInit} from '@angular/core';
import {GuideDialogComponent} from '../../dialog/guide-dialog/guide-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss']
})
export class GuideComponent implements OnInit {

  public guide: {};
  public guides = [
    {
      title: 'Home',
      /*image: require('../../assets/img/Guide/01-home.jpg'),*/
      content: 'Pantalla de inicio<br>- Menu con diferentes opciones que son explicados más adelante en la guía'
    },
    {
      title: 'Profile cPanel',
      /*image: require('../../assets/img/Guide/02.Profile.jpg'),*/
      content: 'Para acceder al Profile hay que hacer clic en el icono del usuario y seleccionar Profile ' +
        '<br>- Hay dos formularios uno para actualizar su contraseña y otro para actualizar sus datos'
    },
    {
      title: 'Clients',
      /*image: require('../../assets/img/Guide/03.Client.jpg'),*/
      content: 'Listado de clientes registrados en Gardens of America'
    },
    {
      title: 'Information of Client',
      /*image: require('../../assets/img/Guide/04.Client-show.jpg'),*/
      content: 'Información detallada del cliente'
    },
    {
      title: 'Products',
      /*image: require('../../assets/img/Guide/05.Products.jpg'),*/
      content: 'Lista de productos registrados'
    },
    {
      title: 'Information of Product',
      /*image: require('../../assets/img/Guide/06.DetailProducts.jpg'),*/
      /*image_three: require('../../assets/img/Guide/06.DetailProduct.jpg'),*/
      content: 'Información detallada del producto<br> ' +
        '<ul>' +
        '<li>Nombre: tiene que ser un valor único, que no haya sido registrado antes</li>' +
        '<li>Descripción corta: descripción corta del producto</li>' +
        '<li>Descripción uno: descripción larga que se encuentra por debajo del nombre producto y la descripción corta</li>' +
        '<li>Descripción dos: descripción larga que aparece con la información nutricional del producto</li>' +
        '<li>Preparación: información de como preparar el producto</li>' +
        '<li>Nutrición: imagen sobre los valores nutricionales</li>' +
        '<li>Precio: expresado en dolares y después del punto colocar los centavos del valor del producto</li>' +
        '<li>Cantidad: cantidad que se maneja en el almacén</li>' +
        '</ul>'
    },
    {
      title: 'Categories of Product',
      /*image: require('../../assets/img/Guide/07.Categories.jpg'),*/
      content: 'Las categorías que pertenecen al producto'
    },
    {
      title: 'Images of Product - Part 1',
      /*image: require('../../assets/img/Guide/08.Images.jpg'),*/
      content: 'Imágenes del Producto<br>Inicialmente tiene una imagen por default, una vez agregada una nueva no se tendrá en cuenta'
    },
    {
      title: 'Images of Product - Part 2',
      /*image: require('../../assets/img/Guide/09.Images.jpg'),*/
      content: 'La imagen del producto se puede eliminar o editar'
    },
    {
      title: 'Categories',
      /*image: require('../../assets/img/Guide/10.Categories.jpg'),*/
      content: 'Espacio para agregar nuevas categorías para los productos'
    },
    {
      title: 'Detail of Category',
      /*image: require('../../assets/img/Guide/11.Category.jpg'),*/
      content: 'Detalle de la categoría, se puede agregar una nueva o editar'
    },
    {
      title: 'Reviews',
      /*image: require('../../assets/img/Guide/12.Reviews.jpg'),*/
      content: 'Crítica de los clientes acerca del producto'
    },
    {
      title: 'Detail of Review',
      /*image: require('../../assets/img/Guide/13.Reviews.jpg'),*/
      content: 'Detalles de la crítica hecha por el cliente'
    },
    {
      title: 'Orders',
      /*image: require('../../assets/img/Guide/14.Orders.jpg'),*/
      content: 'Listado de ordenes filtrados por status'
    },
    {
      title: 'Detail of Order',
      /*image: require('../../assets/img/Guide/15.Order.jpg'),*/
      content: 'Detalle de la orden' +
        '<br>-Se puede cancelar la orden(no recomendado si el pago está confirmado)' +
        '<br>-Ver detalles de los productos y los datos del cliente para hacer el envío'
    },
    {
      title: 'Users',
      /*image: require('../../assets/img/Guide/16.Users.jpg'),*/
      content: 'Listado de usuarios que tienen acceso al cPanel<br>-Se puede crear nuevos usuarios, no editarlos'
    },
    {
      title: 'Detail of User',
      /*image: require('../../assets/img/Guide/17.User.jpg'),*/
      content: 'Detalle del usuario'
    },
    {
      title: 'Newsletter emails',
      /*image: require('../../assets/img/Guide/18.Emails.jpg'),*/
      content: 'Listado de correos suscrito'
    },
    {
      title: 'Payments',
      /*image: require('../../assets/img/Guide/19.Payments.jpg'),*/
      /*image_two: require('../../assets/img/Guide/20.Paypal.jpg'),*/
      content: '<h6 class="mb-2">Production token</h6> Si esta desmarcado significa que está en modo ' +
        'de prueba y los pagos no serán procesados.' +
        '<h6 class="mt-2 mb-2">Stripe secret token</h6> Inicie sesión o cree una cuenta en ' +
        '<a class="link-payment" href="https://dashboard.stripe.com/login">stripe</a> y ' +
        'seleccione activar cuenta, complete el formulario y en ' +
        '<a class="link-payment" href="https://dashboard.stripe.com/account/apikeys">keys</a> ' +
        'del dashboard de Stripe copie el Secret key (debe estar en modo live y no test), ' +
        'pegue en esta sección del cPanel y guarde los cambios.',
      content_two: '<h6 class="mt-2 mb-2">Paypal access token</h6> Inicie sesión en ' +
        '<a class="link-payment" ' +
        'href="https://www.paypal.com/signin?returnUri=https%3A%2F%2Fdeveloper.paypal.com%2Fdeveloper%2Fapplications">paypal ' +
        'developer</a> ' +
        '(necesita tener una cuenta de tipo business account).<br>Seleccione My apps & credentials: cree una nueva app, ' +
        'una vez creada cambie a live mode' +
        ' como indica la imagen y haga clic en show y copie el Secret, una vez copiado pegue el token en Paypal access ' +
        'token y guarde los cambios.',
    },
  ];

  constructor(
    public dialog: MatDialog,
  ) {
  }

  ngOnInit() {
  }

  openDialog(guide: {}) {
    this.guide = guide;
    this.dialog.open(GuideDialogComponent, {width: '700px', data: guide}).afterClosed()
      .subscribe(() => {
        console.log('close');
      });
  }
}
