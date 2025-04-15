"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

// Components
import VendorStats from "../../components/vendor/VendorStats";
import FilterSelect from "../../components/vendor/VendorFilters";
import VendorTable from "../../components/vendor/VendorTable";
import BulkActions from "../../components/vendor/BulkActions";
import SimpleDialog from "../../components/vendor/SimpleDialogue";

// Import vendor data and helper functions
import {
  vendorData,
  getUniqueCities,
  getUniqueStates,
} from "../../data/vendorData";

export default function VendorPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [accountStateFilter, setAccountStateFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [vendorToDelete, setVendorToDelete] = useState(null);
  const [showBulkDeleteDialog, setShowBulkDeleteDialog] = useState(false);

  // Calculate summary statistics
  const totalVendors = vendorData.length;
  const verifiedVendors = vendorData.filter(
    (vendor) => vendor.status === "Verified"
  ).length;
  const mechanicsCount = vendorData.filter(
    (vendor) => vendor.type === "mechanic"
  ).length;
  const dealersCount = vendorData.filter(
    (vendor) => vendor.type === "dealer"
  ).length;

  // Function to navigate to vendor detail page
  const navigateToVendorDetail = (vendorId) => {
    router.push(`/vendor/${vendorId}`);
  };

  // Function to handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle sort direction if clicking the same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set new sort field and default to ascending
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Handle individual vendor delete
  const handleDeleteVendor = (vendor, e) => {
    e.stopPropagation(); // Prevent row click event
    setVendorToDelete(vendor);
    setShowDeleteDialog(true);
  };

  // Confirm individual vendor delete
  const confirmDeleteVendor = () => {
    // Here you would implement the actual delete logic
    console.log(`Deleting vendor: ${vendorToDelete.id}`);
    // After deletion, close dialog and reset state
    setShowDeleteDialog(false);
    setVendorToDelete(null);
  };

  // Handle bulk actions
  const handleBulkAction = (action) => {
    if (action === "delete") {
      setShowBulkDeleteDialog(true);
    } else if (action === "suspend") {
      // Implement suspend logic
      console.log(`Suspending vendors: ${selectedVendors.join(", ")}`);
    } else if (action === "verify") {
      // Implement verify logic
      console.log(`Verifying vendors: ${selectedVendors.join(", ")}`);
    }
  };

  // Confirm bulk delete
  const confirmBulkDelete = () => {
    // Here you would implement the actual bulk delete logic
    console.log(`Bulk deleting vendors: ${selectedVendors.join(", ")}`);
    setShowBulkDeleteDialog(false);
    setSelectedVendors([]);
  };

  // Handle select/deselect all vendors
  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedVendors(processedVendors.map((vendor) => vendor.id));
    } else {
      setSelectedVendors([]);
    }
  };

  // Handle select/deselect individual vendor
  const handleSelectVendor = (vendorId, isSelected) => {
    if (isSelected) {
      setSelectedVendors([...selectedVendors, vendorId]);
    } else {
      setSelectedVendors(selectedVendors.filter((id) => id !== vendorId));
    }
  };

  // Verify a vendor account
  const handleVerifyVendor = (vendor, e) => {
    e.stopPropagation(); // Prevent row click event
    // Here you would implement the verification logic
    console.log(`Verifying vendor: ${vendor.id}`);
  };

  // Filter and sort vendors
  const processedVendors = vendorData
    .filter((vendor) => {
      // Search filter
      const matchesSearch =
        vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (vendor.location &&
          vendor.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (vendor.type &&
          vendor.type.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (vendor.company &&
          vendor.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
        vendor.currentState.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.status.toLowerCase().includes(searchQuery.toLowerCase());

      // Status filter
      const matchesStatus =
        statusFilter === "" || vendor.status === statusFilter;

      // State filter
      const matchesState = stateFilter === "" || vendor.state === stateFilter;

      // City filter
      const matchesCity = cityFilter === "" || vendor.city === cityFilter;

      // Account state filter
      const matchesAccountState =
        accountStateFilter === "" || vendor.currentState === accountStateFilter;

      // Type filter
      const matchesType = typeFilter === "" || vendor.type === typeFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesState &&
        matchesCity &&
        matchesAccountState &&
        matchesType
      );
    })
    .sort((a, b) => {
      // Handle different field types for sorting
      if (sortField === "regDate") {
        // Date sorting
        const dateA = new Date(a[sortField]);
        const dateB = new Date(b[sortField]);
        return sortDirection === "asc"
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      } else {
        // String sorting
        const valueA = (a[sortField] || "").toLowerCase();
        const valueB = (b[sortField] || "").toLowerCase();

        if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
        if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
        return 0;
      }
    });

  // Extract unique status, state, city and type values for filter dropdowns
  const statuses = [...new Set(vendorData.map((c) => c.status))];
  const types = [...new Set(vendorData.map((c) => c.type))];
  const accountStates = [...new Set(vendorData.map((c) => c.currentState))];
  const cities = getUniqueCities();
  const states = getUniqueStates();

  return (
    <div className="min-h-screen flex flex-col w-full">
      <div className="flex flex-1">
        <div className="flex-1 w-full overflow-auto bg-white">
          <div className="container mx-auto px-4 py-8 max-w-6xl">
            <VendorStats
              mechanicsCount={mechanicsCount}
              dealersCount={dealersCount}
              totalVendors={totalVendors}
              verifiedVendors={verifiedVendors}
            />

            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">Vendors</h1>

            </div>

            {selectedVendors.length > 0 && (
              <BulkActions
                selectedCount={selectedVendors.length}
                onAction={handleBulkAction}
                onCancel={() => setSelectedVendors([])}
              />
            )}

            <VendorTable
              vendors={processedVendors}
              sortField={sortField}
              sortDirection={sortDirection}
              handleSort={handleSort}
              onVendorClick={navigateToVendorDetail}
              onDeleteVendor={handleDeleteVendor}
              onVerifyVendor={handleVerifyVendor}
              selectedVendors={selectedVendors}
              onSelectVendor={handleSelectVendor}
              onSelectAll={handleSelectAll}
            />

            {/* Delete confirmation dialog */}
            {showDeleteDialog && vendorToDelete && (
              <SimpleDialog
                isOpen={showDeleteDialog}
                onClose={() => setShowDeleteDialog(false)}
                title="Confirm Delete"
                actions={
                  <>
                    <button
                      onClick={() => setShowDeleteDialog(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmDeleteVendor}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </>
                }
              >
                <p>
                  Are you sure you want to delete {vendorToDelete.name}? This
                  action cannot be undone.
                </p>
              </SimpleDialog>
            )}

            {/* Bulk delete confirmation dialog */}
            {showBulkDeleteDialog && (
              <SimpleDialog
                isOpen={showBulkDeleteDialog}
                onClose={() => setShowBulkDeleteDialog(false)}
                title="Confirm Bulk Delete"
                actions={
                  <>
                    <button
                      onClick={() => setShowBulkDeleteDialog(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmBulkDelete}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete All
                    </button>
                  </>
                }
              >
                <p>
                  Are you sure you want to delete {selectedVendors.length}{" "}
                  vendors? This action cannot be undone.
                </p>
              </SimpleDialog>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


// Removed redundant function declaration

