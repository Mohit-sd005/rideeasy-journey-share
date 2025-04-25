
import apiClient from './api';

export interface RidePayload {
  from: string;
  to: string;
  date: string;
  time: string;
  seats: number;
  price: number;
  vehicleDetails?: string;
  notes?: string;
}

export interface RideResponse {
  id: string;
  from: string;
  to: string;
  date: string;
  time: string;
  seats: number;
  price: number;
  status: string;
  riderId: string;
  riderName: string;
  riderRating: number;
  vehicleDetails: string;
  notes: string;
  passengers: PassengerInfo[];
  createdAt: string;
}

export interface PassengerInfo {
  id: string;
  name: string;
  rating: number;
  status: "pending" | "confirmed" | "rejected";
}

export interface BookingRequest {
  rideId: string;
  passengerId: string;
  message?: string;
}

export const rideService = {
  // Rider APIs
  createRide: async (payload: RidePayload): Promise<RideResponse> => {
    const response = await apiClient.post<RideResponse>('/rides', payload);
    return response.data;
  },

  getRidesByRider: async (): Promise<RideResponse[]> => {
    const response = await apiClient.get<RideResponse[]>('/rides/rider');
    return response.data;
  },

  getRideRequests: async (): Promise<any[]> => {
    const response = await apiClient.get<any[]>('/rides/requests');
    return response.data;
  },

  acceptRideRequest: async (requestId: string): Promise<any> => {
    const response = await apiClient.put(`/rides/requests/${requestId}/accept`);
    return response.data;
  },

  rejectRideRequest: async (requestId: string): Promise<any> => {
    const response = await apiClient.put(`/rides/requests/${requestId}/reject`);
    return response.data;
  },

  completeRide: async (rideId: string): Promise<any> => {
    const response = await apiClient.put(`/rides/${rideId}/complete`);
    return response.data;
  },

  // Passenger APIs
  getAvailableRides: async (from?: string, to?: string, date?: string): Promise<RideResponse[]> => {
    let url = '/rides/available';
    const params = new URLSearchParams();
    
    if (from) params.append('from', from);
    if (to) params.append('to', to);
    if (date) params.append('date', date);
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    const response = await apiClient.get<RideResponse[]>(url);
    return response.data;
  },

  bookRide: async (payload: BookingRequest): Promise<any> => {
    const response = await apiClient.post('/rides/book', payload);
    return response.data;
  },

  getPassengerRides: async (): Promise<any[]> => {
    const response = await apiClient.get('/rides/passenger');
    return response.data;
  },

  rateRide: async (rideId: string, rating: number, review?: string): Promise<any> => {
    const response = await apiClient.post(`/rides/${rideId}/rate`, { rating, review });
    return response.data;
  },

  // Payment
  initiatePayment: async (rideId: string): Promise<any> => {
    const response = await apiClient.post(`/payment/initiate/${rideId}`);
    return response.data;
  },

  verifyPayment: async (rideId: string, paymentDetails: any): Promise<any> => {
    const response = await apiClient.post(`/payment/verify/${rideId}`, paymentDetails);
    return response.data;
  },
};
