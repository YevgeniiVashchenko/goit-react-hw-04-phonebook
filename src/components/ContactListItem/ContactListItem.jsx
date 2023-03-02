import PropTypes from 'prop-types';
import { ListItem, Text, Button } from './ContactListItem.styled';

export const ContactListItem = ({
  contactName,
  contactNumber,
  contactId,
  contactDelete,
}) => {
  return (
    <ListItem>
      <Text>
        {contactName}: {contactNumber}
      </Text>
      <Button type="button" onClick={() => contactDelete(contactId)}>
        Delete
      </Button>
    </ListItem>
  );
};

ContactListItem.propTypes = {
  contactName: PropTypes.string.isRequired,
  contactNumber: PropTypes.string.isRequired,
  contactId: PropTypes.string.isRequired,
  contactDelete: PropTypes.func.isRequired,
};