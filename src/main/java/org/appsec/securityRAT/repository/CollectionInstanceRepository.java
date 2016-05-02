package org.appsec.securityRAT.repository;

import org.appsec.securityRAT.domain.CollectionInstance;
import org.appsec.securityRAT.domain.RequirementSkeleton;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.Set;

/**
 * Spring Data JPA repository for the CollectionInstance entity.
 */
public interface CollectionInstanceRepository extends JpaRepository<CollectionInstance,Long> {



	@Query("select distinct collectionInstance from CollectionInstance collectionInstance "
			+ "left join collectionInstance.requirementSkeletons rs "
			+ "where collectionInstance.active=true "
			+ "and :skeleton in rs")
	public Set<CollectionInstance> findActiveCollectionsForSkeleton(@Param("skeleton") RequirementSkeleton skeleton);

}
