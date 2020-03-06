const TabSchema = [
  {
    displayText: 'Names',
    fields: [
      {
        displayText: 'English',
        path: 'properties.english_place_name',
      },
      {
        displayText: 'Italian',
        path: 'properties.italian_place_name',
      },
      {
        displayText: 'Alternate place names',
        path: 'properties.alternate_place_names',
      },
    ],
  },
  {
    displayText: 'Community and\nPatronage',
    fields: [
      {
        displayText: 'Order',
        path: 'properties.order',
      },
      {
        displayText: 'Subject of Dedication',
        path: 'properties.dedication',
      },
      {
        displayText: 'Gender',
        path: 'properties.gender',
      },
      {
        displayText: 'Rank at Foundation',
        path: 'properties.rank_at_foundation',
      },
      {
        displayText: 'Mother House To',
        path: 'properties.children',
      },
      {
        displayText: 'Subject Of',
        path: 'properties.parent',
      },
      {
        displayText: 'Founder(s)',
        path: 'properties.founders',
      },
    ],
  },
  {
    displayText: 'Location',
    fields: [
      {
        displayText: 'Longitude and Latitude',
        path: 'geometry.coordinates',
      },
      {
        displayText: 'Are These Coordinates Fairly Precise',
        path: 'properties.positional_accuracy_assesment',
      },
      {
        displayText: 'Historical Region',
        path: 'properties.historical_province',
      },
      {
        displayText: 'Modern Province',
        path: 'properties.province',
      },
      {
        displayText: 'Modern Comune',
        path: 'properties.comune',
      },
      {
        displayText: 'Location Name Variations',
        path: 'properties.alternate_location_names',
      },
      {
        displayText: 'Geonames URI ',
        path: 'properties.location_see_also_uris',
      },
      {
        displayText: 'Approximate Elevation in Meters',
        path: 'properties.elevation',
      },
    ],
  },
  {
    displayText: 'Sustainability',
    fields: [
      {
        displayText: 'Date(s) Visited',
        path: 'properties.dates_visited',
      },
      {
        displayText: 'Does A Structure (Norman or Later) Exist Today?',
        path: 'properties.archaeological_remains',
      },
      {
        displayText:
          'Seismic Classification According to the Dipartimento della Protezione Civile (2015)\n(on a scale of 1 - 4, with 1 representing the greatest risk for strong seismic activity)',
        path: 'properties.seismic_class_id',
      },
      {
        displayText: 'Cultural Stone Stability Index for Observation One',
        path: 'properties.cultural_stone_stability_index_for_observation_one',
      },
      {
        displayText: 'Cultural Stone Stability Index for Observation Two',
        path: 'properties.cultural_stone_stability_index_for_observation_two',
      },
      {
        displayText: 'Cultural Stone Stability Index for Observation Three',
        path: 'properties.cultural_stone_stability_index_for_observation_three',
      },
      {
        displayText: 'Greatest Stone Stability Concerns ',
        path: 'properties.stone_stability_concerns',
      },
      {
        displayText: 'Greatest External Threats',
        path: 'properties.stone_external_threats',
      },
    ],
  },
  {
    displayText: 'Attestation',
    fields: [
      {
        displayText: 'Types',
        path: 'properties.attestation_types',
      },
      {
        displayText: 'Earliest Surviving Record (Minimum Year) ',
        path: 'properties.earliest_attestation_min_year',
      },
      {
        displayText: 'Earliest Surviving Record (Maximum Year) ',
        path: 'properties.earliest_attestation_max_year',
      },
      {
        displayText: 'Earliest Surviving Record Notes',
        path: '',
      },
      {
        displayText: 'Period of First Attestation',
        path: 'properties.reign_of_earliest_attestation_label',
      },
    ],
  },
  {
    displayText: 'Selected Sources\nand Notes',
    fields: [
      {
        displayText: 'Sources',
        path: 'properties.place_references',
      },
      {
        displayText: 'Notes',
        path: 'properties.notes',
      },
    ],
  },
  {
    displayText: 'Metadata',
    fields: [
      {
        displayText: 'Record Status',
        path: 'properties.record_status',
      },
      {
        displayText: 'Creation Date',
        path: 'properties.created_at',
      },
      {
        displayText: 'Creation By',
        path: 'properties.created_by',
      },
      {
        displayText: 'Last Updated on',
        path: 'properties.updated_at',
      },
      {
        displayText: 'Updated By',
        path: 'properties.updated_by',
      },
    ],
  },
];

export default TabSchema;
