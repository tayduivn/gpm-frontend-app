import {Injectable} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  public map: any;
  public geocoder: any;
  private marker: any;
  private token = 'pk.eyJ1IjoiaXZhbnM1MSIsImEiOiJjanEyNWdvZ3oxNHZtNDNwZDgzanprb2F4In0.Uz6zCYJK5glhBOnByNXTvQ';
  private url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  public setMap(center = [-58.38194, -34.59972], zoom = 13, showCurrent = false) {
    const self = this;
    Object.getOwnPropertyDescriptor(mapboxgl, 'accessToken').set(this.token);
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: center,
      zoom: zoom
    });

    this.geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: false
    });

    document.getElementById('geocoder').appendChild(this.geocoder.onAdd(this.map));

    this.geocoder.on('result', ev => {
      self.putMarker([ev.result.geometry.coordinates[0], ev.result.geometry.coordinates[1]]);
    });

    this.map.on('click', ev => this.setMarker(ev.lngLat.lng, ev.lngLat.lat));

    if (showCurrent) {
      this.map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      }));
    }
  }

  public setMarker(lng, lat) {
    this.putMarker([lng, lat]);
    this.map.flyTo({center: [lng, lat]});
  }

  private putMarker(lngLat) {
    if (this.marker !== undefined) {
      this.marker.remove();
    }
    this.marker = new mapboxgl.Marker().setLngLat(lngLat).addTo(this.map);
  }

  getLocationName(lng, lat) {
    return this.httpClient.get(`${this.url}${lng},${lat}.json?access_token=${this.token}`);
  }
}
